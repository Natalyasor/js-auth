export const REG_EXP_EMAIL = new RegExp(
  '^[A-Za-z0-9](([a-zA-Z0-9,=.!-#|$%^&*+/?_`{}~]+)*)@(?:[0-9a-zA-Z-]+.)+[a-zA-Z]{2,9}$',
)

export const REG_EXP_PASSWORD = new RegExp(
  '^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!#@$%&/()=?*-+-_.:;,][{}^]).{8,32}',
)

export class Form {
  FIELD_NAME = {}
  FIELD_ERROR = {}

  value = {}
  error = {}
  disabled = true

  change = (name, value) => {
    const error = this.validate(name, value)

    this.value[name] = value

    if (error) {
      this.setError(name, error)
      this.error[name] = error
    } else {
      this.setError(name, null)
      delete this.error[name]
    }
    this.checkDisabled()
  }

  setError = (name, error) => {
    const span = document.querySelector(
      `.form__error[name="${name}"]`,
    )
    const input = document.querySelector(
      `.field__input[name="${name}"]`,
    )
    if (span) {
      span.classList.toggle(
        'form__error--active',
        Boolean(error),
      )
      span.innerText = error || ''
    }

    if (field) {
      field.classList.toggle(
        'validation--active',
        Boolean(error),
      )
    }
  }

  checkDisabled = () => {
    let disabled = false

    Object.values(this.FIELD_NAME).forEach((name) => {
      if (
        this.error[name] ||
        this.value[name] === undefined
      ) {
        disabled = true
      }
    })

    const el = document.querySelector(`.button`)

    if (el) {
      el.classList.toggle(
        'button--disabled',
        Boolean(disabled),
      )
    }
    this.disabled = disabled
  }

  validateAll = () => {
    Object.values(this.FIELD_NAME).forEach((name) => {
      const error = this.validate(name, this.value[name])

      if (error) {
        this.setError(name, error)
        disabled = true
      }
    })

    this.disabled = disabled
  }
}
