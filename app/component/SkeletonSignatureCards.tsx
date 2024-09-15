const SkeletonSignatureCards = () => {
  return (
    <div className=' bg-foreground text-background rounded-xl transition-all'>
        <div className='flex items-center flex-col py-12 gap-16 animate-pulse'>
            <div className='gap-2 text-center w-full flex flex-col justify-center items-center '>
                <div className='w-2/3 h-5 bg-background/70 rounded-xl'></div>
                <div className='w-1/3 h-5 bg-background/70  rounded-xl'></div>
            </div>
            <div className='w-40 h-40 bg-background/70 rounded-xl flex items-center justify-center text-foreground'></div>
            <div className='flex justify-between items-center w-full px-12'>
            <div className='w-1/4 h-5 bg-background/70 rounded-xl'></div>
                <div className='flex gap-4'>
                <div className='bg-background/70 p-2.5 w-9 h-9 text-foreground rounded-full flex items-center justify-center'></div>
                <div className='bg-background/70 p-2.5 w-9 h-9 text-foreground rounded-full flex items-center justify-center'></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SkeletonSignatureCards