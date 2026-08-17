import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector(state => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadErr, setFileUploadErr] = useState(false)
  const [formData, setFormData] = useState();

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress))
      },
      (error) => {
      setFileUploadErr(true)
      },
      ()=> {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            setFormData({...formData, avatar: downloadURL})
          }
        )
      }
    );
  };

  useEffect(()=> {
    if(file){
      handleFileUpload(file);
    }
  }, [file])


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-3'>
        <input onChange={(e)=> setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
      <img onClick={() => fileRef.current.click()} src={currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
      <p className='text-sm self-center'>
        {fileUploadErr? 
        <span className='text-red-700'>Error Image upload(image must be less than 2mb)</span> :
        filePerc > 0 && filePerc < 100 ? (
          <span className='text-slate-700'> {`Uploading ${filePerc}%`}</span>
        ) : (filePerc == 100 ? <span className='text-green-700'>Image Uploaded Successfully</span> : "")
      }
      </p>
      <input type='text' placeholder='Username' id='username' className= 'p-3 rounded-lg bg-white'/>    
      <input type='text' placeholder='Email' id='email' className='p-3 rounded-lg bg-white'/>    
      <input type='text' placeholder='Password' id='password' className='p-3 rounded-lg bg-white'/>
      <button className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-50'>Update</button>    
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
