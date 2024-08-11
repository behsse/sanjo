import { ChevronRight } from 'lucide-react';

type Props = {
    left? : boolean
    onClick : () => void;
    className? : string
}

export const Arrow = (props : Props) => {

    return(
      <div onClick={props.onClick} className={`${props.className}`}>
        <ChevronRight className={`${props.left ? "rotate-180" : ""} bg-foreground text-background p-2.5 w-9 h-9 rounded-full`}/>
      </div>
    )
}
