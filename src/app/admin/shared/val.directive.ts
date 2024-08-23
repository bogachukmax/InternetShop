import { AbstractControl } from "@angular/forms"

export const val = (regExp: RegExp, name: string) => {
    return (control: AbstractControl) => {
        return regExp.test(control.value) ? null : { [name]: "failed"}
    }
}