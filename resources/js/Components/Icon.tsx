type Props = {
  size?: string|number
  icon: 'plus' | 'close' | 'edit' | 'trash' | 'check' | 'excel' | 'xml' | 'eye' | 'copy'
  className?: string
}

export default function Icon({size = '1em', icon, className}: Props) {
  return <svg width={size} height={size} className={className}>
    <use xlinkHref={`/assets/image/icons.svg#${icon}`}/>
  </svg>
}
