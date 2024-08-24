
function CardShost({content}) {
  return (
    <div className="-short">
    <div className="-thumb">
      <img src={content.video_thumbnail} alt="" />
    </div>
    <div className="-about">
      <div className="-detail">
        <a href="#" className="-title">{content.video_title}</a>
        <div className="-view">การดู 999 ครั้ง</div>
      </div>
    </div>
  </div>
  )
}

export default CardShost