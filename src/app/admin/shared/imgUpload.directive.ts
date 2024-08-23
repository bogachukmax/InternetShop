import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

export function imgUpload(control: AbstractControl): Observable<ValidationErrors | null> {
    return new Observable(observer => {
        const url = control.value

        if(!url){
            observer.next(null)
            observer.complete();
            return;
        }

        const img = new Image();
        img.onload = () => {
          observer.next(null);
          observer.complete();
        };
        img.onerror = () => {
          observer.next({ invalidUrl: true });
          observer.complete();
        };
        img.src = url;
    })
}