import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
 

    errorHandler(arg0: any): any {
        throw new Error("Method not implemented.");
    }


 

    constructor(private http: Http) { }

   

    spacexData(data: any) {
        const link = data.url;
        return this.http.get(link).map(
            (response: Response) => {
                return response.json();
            }
        )
    }

    
}
