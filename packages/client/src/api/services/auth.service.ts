export const AuthServices={

    saveToken:(token:string)=>{
        localStorage.setItem('authToken',token);
    },

    getToken:()=>{
        localStorage.getItem('authToken');
    }

}