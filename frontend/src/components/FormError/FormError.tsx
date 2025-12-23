type FormErrorProps = {
  msg: string;
};

const FormError = ({ msg }: FormErrorProps) => {
  return <p className="text-red-600">{msg}</p>;
};

export default FormError;
