import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_St4BdemeM",
    ClientId: "3k74cgle4guv3l104hpfpub56r"
}

export default new CognitoUserPool(poolData);