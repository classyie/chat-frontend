import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import { X } from 'lucide-react';

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const {sendMessage} = useChatStore();
  const handleImageChange = (e) => {};
  const removeImage = () => {};

  const handleSendMessage = async(e) => {};
  return (
    <div className='p-4 w-full'>
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className='relative'>
            <img src={imagePreview} alt="Image" className="w-20 h-20 rounded-lg object-cover border-zinc-700" />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 rounded-full bg-base-300 flex items-center justify-center"
              type='button'
            >
              <X className='size-3' />
            </button>
          </div>
          <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                className="w-full input rounded-lg border-base-200 p-2 focus:outline-none"
              />
              <input type="file" />
            </div>
          </form>
        </div>
      )}
      
    </div>
  )
}

export default MessageInput;
