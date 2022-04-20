import { Trans } from "@lingui/macro";
import { DeleteOutline } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteDialog = ({
  open,
  onClose,
  onDelete,
}: DeleteDialogProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="delete-dialog-title"
    aria-describedby="delete-dialog-description"
  >
    <DialogTitle id="delete-dialog-title">
      <Trans>Delete vehicle</Trans>
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="delete-dialog-description">
        <Trans>Are you really sure you want to delete this vehicle?</Trans>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" color="secondary" onClick={onClose}>
        <Trans>Cancel</Trans>
      </Button>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteOutline />}
        onClick={onDelete}
      >
        <Trans>Delete</Trans>
      </Button>
    </DialogActions>
  </Dialog>
);
