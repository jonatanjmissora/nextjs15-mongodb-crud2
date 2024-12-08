import { ErrorType } from "../types/error.type"

export const validateNoteInput = async (label: string, inputValue: string, errors: ErrorType) => {
    let minChar, maxChar, labelStr
    const regex = /^[a-zA-Z0-9-_!?¿¡ ]*$/
    let actualValue = inputValue.trim()
  
    if (label === "title") {
      minChar = 3
      maxChar = 20
      labelStr = "titulo"
    }
    if (label === "content") {
      minChar = 4
      maxChar = 100
      labelStr = "contenido"
    }
    if (typeof inputValue !== "string") actualValue = ""
    if (actualValue.length <= minChar) errors[label] = ` El ${labelStr} debe tener mas de ${minChar} caracteres.`
    if (actualValue.length >= maxChar) errors[label] = ` El ${labelStr} debe tener menos de ${maxChar} caracteres.`
    if (actualValue === "") errors[label] = ` Debes ingresar ${labelStr}.`
  
    if (!regex.test(inputValue)) errors[label] += ` El ${labelStr} debe contener caracteres válidos.`
  }
  