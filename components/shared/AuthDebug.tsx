"use client";

import { useAuth } from "@/hooks/useAuth";


export default function AuthDebug(){

  const {
    user,
    isLoading
  } = useAuth();


  if(isLoading){
    return <p>Loading...</p>;
  }


  return (
    <div>
      <pre>
        {JSON.stringify(user,null,2)}
      </pre>
    </div>
  );
}