const uri = 'http://35.244.22.147:8081';
// const uri = 'http://127.0.0.1:8081';
export const getGeneralQueryResp = async({data, creativity}) => {
    const url = `${uri}/send_data`;
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
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

export const getCutomerQueryResp = async ({prompt, productId, customerId, creativity}) => {
  const url = `${uri}/send_customer_data`;
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
      body: JSON.stringify({"custom_prompt": prompt, "product_id": productId, "customer_id": customerId, "temperature": creativity}), // body data type must match "Content-Type" header
    });
    const resp = await response.text();
    return resp; // parses JSON response into native JavaScript objects
  
}


export const getCustomers = async(customer) => {
  const url = `${uri}/customers?`;
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    body: JSON.stringify({"customer_name": customer}), // body data type must match "Content-Type" header
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin':'*'
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  const resp = await response.json();
  return resp; // parses JSON response into native JavaScript objects
}

export const getProducts = async(customer) => {
  const url = `${uri}/get_Products?customer=${customer}`;
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin':'*'
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  const resp = await response.json();
  return resp; // parses JSON response into native JavaScript objects
}