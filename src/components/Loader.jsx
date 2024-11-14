export default function loader({ fullScreen = false}) {
    return (
        <div className={`flex justify-center items-center my-5 ${fullScreen && 'absolute top-52 left-1/2'}`}>
            <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
    );
}
