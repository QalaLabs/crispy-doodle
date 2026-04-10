"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageUpload from "./ImageUpload";

interface AvatarUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: (url: string) => void;
}

const AvatarUploadModal: React.FC<AvatarUploadModalProps> = ({ isOpen, onClose, onUploadComplete }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#0F5B56]">Change Avatar</DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <ImageUpload onUploadComplete={(url) => {
            onUploadComplete(url);
            onClose();
          }} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarUploadModal;
