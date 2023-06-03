export default function PlaceImg({place,index=0,className=null}) {
  if (!place.photos?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover';
  }
  return (
    <>
      {place.photos.map(photo => {
        return(
          <img className={className} key={photo} src={photo} alt=""/>
        )
      })}
    </>
  );
}