import DeleteIcon from "@mui/icons-material/Delete";

const DeleteButton = ({ onDelete }) => {
  return (
    <button className="text-red-500 p-2" onClick={onDelete}>
      <DeleteIcon />
    </button>
  );
};

export default DeleteButton;
