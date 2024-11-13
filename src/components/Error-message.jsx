import React from 'react';

const ErrorMessage= ({message}) => {
  return (
    <div className="peer-invalid:block my-2">
    <div className="mt-2 flex items-center gap-1">
      <div className="w-4 fill-rose-500">
        <svg
          viewBox="0 0 24 24"
          data-name="Layer 1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24,12A12,12,0,1,1,12,0,12.013,12.013,0,0,1,24,12ZM13,5H11V15h2Zm0,12H11v2h2Z"
          ></path>
        </svg>
      </div>
      <p className="Capitalize font-medium text-rose-500">{message}</p>
    </div>
  </div>
  );
}

export default ErrorMessage;
