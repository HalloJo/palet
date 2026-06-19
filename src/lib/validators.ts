import { MAX_BRAND_NAME_LENGTH, MAX_DESCRIPTION_LENGTH } from './constants'

export interface FormErrors {
  brandName?: string
  description?: string
}

export function validateForm(brandName: string, description: string): FormErrors {
  const errors: FormErrors = {}

  if (!brandName.trim()) {
    errors.brandName = 'Brand name is required.'
  } else if (brandName.trim().length > MAX_BRAND_NAME_LENGTH) {
    errors.brandName = `Brand name must be ${MAX_BRAND_NAME_LENGTH} characters or fewer.`
  }

  if (!description.trim()) {
    errors.description = 'Brand description is required.'
  } else if (description.trim().length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`
  }

  return errors
}
