type MongooseValidationError = Error & {
  name: "Помилка валідації";
  errors: Record<string, { message: string }>;
}

export default MongooseValidationError