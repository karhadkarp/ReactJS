export const getGeneralQueryResp = async({data, creativity}) => {
    const url = 'http://35.244.22.147:8081/send_data';
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*'
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({"prompt": data, "temperature": creativity}), // body data type must match "Content-Type" header
      });
      const resp = await response.text();
      return resp; // parses JSON response into native JavaScript objects
    
}