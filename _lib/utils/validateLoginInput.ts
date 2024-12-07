type ErrorType = {
  [key: string]: string | number;
}

export const validateLoginInput = async (label: string, inputValue: string, errors: ErrorType) => {
  let labelStr = ""
  const regex = /^[a-zA-Z0-9]*$/
  let actualValue = inputValue.trim()

  if (label === "username") {
    labelStr = "nombre"
  }
  if (label === "userpassword") {
    labelStr = "contraseña"
  }
  if (typeof inputValue !== "string") actualValue = ""
  if (actualValue === "") errors[label] = ` Debes ingresar ${labelStr}.`
  if (!regex.test(inputValue)) errors[label] = ` El ${labelStr} debe contener caracteres válidos.`
}