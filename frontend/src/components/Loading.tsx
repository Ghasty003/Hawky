function Loading() {
    return (
        <div className='h-screen flex items-center justify-center gap-2'>
            <div className='animate-spin w-8 h-8 border-[4px] border-white rounded-full border-t-dodger mr-1' />
            <p className='italic text-xl'>Loading...</p>
        </div>
    );
}

export default Loading;