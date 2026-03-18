
export async function getRecipeSummary(text) {
 
    const response = await fetch ("https://api-interface.huggingface.co/models/facebook/bart-large-cnn",
       {method:"POST",
        headers:{
          Authorization:`Bearer ${import.meta.env.VITE_HF-API-KEY}`,
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          inputs:text,
        }),
      }
    );

       const data=await response.json();
       return data[0]?.summary_text || "No summary generated";}
       