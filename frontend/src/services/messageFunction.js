import { MESSAGE_ROUTE } from "../config/api";


export const getMessagesAPI = async (
  conversationId
) => {

  try {

    const response = await fetch(
      `${MESSAGE_ROUTE}/${conversationId}`,
      {
        method: "GET",
        credentials: "include"
      }
    );

    const data = await response.json();

    return data;

  } catch (error) {

    return {
      error: true,
      message: error.message
    };

  }

};


// export const sendMessageAPI = async (
//   conversationId,
//   message
// ) => {

//   try {

//     const response = await fetch(
//      `${MESSAGE_ROUTE}/`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },

//         credentials: "include",

//         body: JSON.stringify({
//           conversationId,
//           message

//         })
//       }
//     );

//     const data = await response.json();

//     return data;

//   } catch (error) {

//     return {
//       error: true,
//       message: error.message
//     };

//   }

// };



export const sendMessageAPI=async(

  conversationId,
  message,
  onChunk,
  signal
  
  )=>{
  
  try{
  
  const response= await fetch(
  `${MESSAGE_ROUTE}/`,
  
  {
  
  method:"POST",
  headers:{
  "Content-Type":
  "application/json"
  },
  
  credentials:"include",

  signal,
  
  body:JSON.stringify({conversationId,message})
  
  }
  
  );

  console.log("Response Status =", response.status);
console.log("Response Body =", response.body);
  
  const reader=
  response.body.getReader();
  
  const decoder=
  new TextDecoder();
  
  while(true){
  
  const {
  done,
  value
  }=await reader.read();
  
  if(done)break;
  
  const chunk=
  decoder.decode(
  value
  );
  

  console.log("Chunk Length =", chunk.length);
  console.log(
    "FRONTEND CHUNK =>",
    chunk
  );

  onChunk(chunk);
  
  }
  
  return{
  
  success:true
  
  };
  
  }catch(error){
  
  return{
  
  error:true,
  
  message:error.message
  
  };
  
  }
  
  };