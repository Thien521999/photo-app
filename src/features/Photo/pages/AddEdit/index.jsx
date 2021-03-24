import Banner from 'components/Banner';
import PhotoForm from 'features/Photo/components/PhotoForm';
import { addPhoto, updatePhoto } from 'features/Photo/PhotoSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import './styles.scss';

AddEditPage.propTypes = {};

function AddEditPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams(); //trả ve object, log ra id trên URL(Làm viec voi path params)
  const isAddMode = !photoId; //dùng de kiem tra khi nào là add, khi nào edit(Nếu là addMode thì o có PhotoId)

  const editedPhoto = useSelector(state => {
    const foundPhoto = state.photos.find(x => x.id === +photoId);
    //console.log({ photos: state.photos, photoId, foundPhoto }); //dong này de test thui hehe
    return foundPhoto;
  }
  );
  console.log({ photoId, editedPhoto, });

  const initialValues = isAddMode
    ?
      {
        title: "",
        categoryId: null,
        photo: "",
      }
    :
      editedPhoto;


  const handleSubmit = (values) => {
    //fake API(thuong thuong o day viet API)
    return new Promise(resolve => {
      console.log('Form submit: ', values);

      setTimeout(() => {
        if (isAddMode) {
          const action = addPhoto(values);
          console.log(action);
          dispatch(action);
        } else {
          //do something here
          const action = updatePhoto(values);
          console.log(action);
          dispatch(action);
        }

        //di chuyen ve trang chu(trang show list photo)
        history.push('/photos');
        resolve(true);
      }, 2000);
    })
  }
  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo 😎" />

      <div className="photo-edit__form">
        <PhotoForm
          isAddMode={isAddMode}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
}

export default AddEditPage;