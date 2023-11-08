export class DynamsoftService {
  endpoint;
  license;
  constructor(endpoint,license) {
    this.endpoint = endpoint;
    this.license = license;
  }

  async getDevices(){
    const url = this.endpoint + "/DWTAPI/Scanners";
    const response = await fetch(url, {"method":"GET", "mode":"cors", "credentials":"include"});
    let scanners = await response.json();
    return scanners;
  }

  async acquireImage(device,pixelType){
    console.log("acquireImage");
    console.log(device);
    console.log(pixelType);
    let url = this.endpoint + "/DWTAPI/ScanJobs";
    let scanParams = {
      license:this.license
    };
    if (device) {
      // optional. use the latest device.
      scanParams.device = device;
    }
    scanParams.config = {
      IfShowUI: false,
      Resolution: 200,
      IfFeederEnabled: false,
      IfDuplexEnabled: false,
    };
    scanParams.caps = {};
    scanParams.caps.exception = "ignore";
    scanParams.caps.capabilities = [
      {
        capability: 257, // pixel type
        curValue: pixelType
      }
    ]
    console.log(scanParams);
    const response = await fetch(url, {"body": JSON.stringify(scanParams), "method":"POST", "mode":"cors", "credentials":"include"});
    if (response.status == 201)
    {
      curJobid = await response.text();
      return (await this.getImage(curJobid));
    }else{
      let message = await response.text();
      throw new Error(message);
    }
  }

  async getImage(jobid) {
    // get image.
    const url = this.endpoint + "/DWTAPI/ScanJobs/" + jobid + '/NextDocument';
    const response = await fetch(url, {"method":"GET", "mode":"cors", "credentials":"include"});
    if (response.status === 200)
    {
      const image = await response.blob();
      return this.blobToBase64(image);
    }
  }

  blobToBase64( blob ) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const uri = reader.result?.toString();
        resolve(uri);
      };  
    })
  }
}