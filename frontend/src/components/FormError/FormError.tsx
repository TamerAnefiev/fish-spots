type FormErrorProps = {
  msg: String;
};

const FormError = ({ msg }: FormErrorProps) => {
  return <p className="text-red-600">{msg}</p>;
};

export default FormError;
