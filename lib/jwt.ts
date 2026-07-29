import { jwtVerify } from "jose";


type JwtVerifyResult =
  | {
      success: true;
      data: Record<string, unknown>;
    }
  | {
      success: false;
      data: null;
      message: string;
    };


const getSecretKey = (secret: string) => {
  return new TextEncoder().encode(secret);
};


const verifyToken = async (
  token: string,
  secret: string
): Promise<JwtVerifyResult> => {

  try {

    const { payload } = await jwtVerify(
      token,
      getSecretKey(secret)
    );


    return {
      success: true,
      data: payload as Record<string, unknown>,
    };


  } catch(error){

    return {
      success:false,
      data:null,
      message:"Invalid or expired token",
    };

  }

};


export const jwtUtils = {
  verifyToken,
};