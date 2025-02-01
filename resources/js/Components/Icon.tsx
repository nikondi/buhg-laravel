type Props = {
  size?: string|number
  icon: 'plus' | 'close' | 'edit' | 'trash' | 'check'
}

export default function Icon({size = '1em', icon}: Props) {
  return <svg width={size} height={size}>
    <use xlinkHref={`/assets/image/icons.svg#${icon}`}/>
  </svg>
}
