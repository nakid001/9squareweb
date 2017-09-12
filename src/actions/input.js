export function inputlog(username,password) {  
  return {
      type: "INPUTLOG",
      Upayload: username,
      Ppayload: password,
      payload: 'LOGING'
  }
}
export function inputreg(username, password, repassword) {
  return {
    type: 'INPUTREG',
    Upayload: username,
    Ppayload: password,
    RPpayload: repassword,
    payload: 'REGISTERING'
  }
}