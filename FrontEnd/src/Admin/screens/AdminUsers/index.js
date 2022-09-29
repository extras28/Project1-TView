import React from 'react';
import PropTypes from 'prop-types';
import AdminSideBar from '../../components/AdminSideBar';
import AdminPageContent from '../../components/AdminPageContent';
import { useDispatch, useSelector } from 'react-redux';
import AppAvatar from 'general/components/AppAvatar';
import './style.scss';
import AppButton from 'general/components/AppButton';
import Utils from 'general/utils/Utils';
import AppDeleteModal from 'general/components/AppModalDelete';
import { useState } from 'react';
import { thunkDeleteUser, thunkGetAccountProfile } from 'Admin/adminSlice';
import ModalEditUser from './ModalEditUser';

AdminUser.propTypes = {
    
};

const genders = [
    { value: 'MALE', text: 'Nam' },
    { value: 'FEMALE', text: 'Nữ' },
    { value: 'UNKNOWN', text: 'Không xác định' },
]

function AdminUser(props) {

    const listAccount = useSelector(state => state?.admin?.listAccount);
    const [modalDeleteUser, setModalDeleteUser] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [modalEditUser, setModalEditUser] = useState(false);
    const [eidtId, setEditId] = useState();

    const dispatch = useDispatch();

    


    return (
        <div className='AdminUsers d-flex flex-row bg-light'>
            <AdminSideBar />
            <AdminPageContent 
                title='Danh sách tài khoản'
                content={(
                    <div className='m-6 p-6 border bg-white'>
                        <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                            <th scope="col">ẢNH ĐẠI DIỆN</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">TÊN NGƯỜI DÙNG</th>
                            <th scope="col">ĐỊA CHỈ</th>
                            <th scope="col">NGÀY SINH</th>
                            <th scope="col">GIỚI TÍNH</th>
                            <th scope="col">SỐ ĐIỆN THOẠI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listAccount.map((item, index)=>{
                                return <tr key={item._id} className='cursor-pointer'>
                                        <th>
                                            <AppAvatar 
                                                src={item.avatar}
                                                size='50px'
                                                alt=''
                                            />
                                        </th>
                                        <td style={{verticalAlign: 'middle'}}>{item.email}</td>
                                        <td style={{verticalAlign: 'middle'}}>{item.username}</td>
                                        <td style={{verticalAlign: 'middle'}}>{item.address}</td>
                                        <td style={{verticalAlign: 'middle'}}>{Utils.formatDateTime(item.dob, 'DD/MM/YYYY')}</td>
                                        <td style={{verticalAlign: 'middle'}}>{genders.find(gender => gender.value === item?.['gender'])?.text}</td>
                                        <td style={{verticalAlign: 'middle'}}>{item.phone}</td>
                                        <td style={{verticalAlign: 'middle'}}>
                                            <div className='d-flex flex-row'>
                                            
                                                    <AppButton 
                                                        beforIcon={(<i className="fas fa-eye text-white"></i>)}
                                                        className='btn-green mr-6'
                                                        onClick = {
                                                            () => {
                                                                setEditId(item._id);
                                                                setModalEditUser(true);
                                                                dispatch(thunkGetAccountProfile(item._id))
                                                            }
                                                        }
                                                    />
                                
                                                    <AppButton 
                                                        beforIcon={(<i className="fas fa-trash text-white"></i>)}
                                                        className='btn-red'
                                                        onClick = {
                                                            () => {
                                                                setModalDeleteUser(true);
                                                                setDeleteId(item._id);
                                                            }
                                                        }
                                                    />
                                               
                                            </div>
                                        </td>
                                        </tr>
                            })}
                        </tbody>
                        </table>
                    </div>
                )}
            />
            <AppDeleteModal 
                show={modalDeleteUser}
                onClose={()=>setModalDeleteUser(false)}
                deleteTitle='Xóa người dùng'
                deleteText='xóa người dùng này ?'
                deleteItem={()=>{
                    dispatch(thunkDeleteUser(deleteId));
                    setDeleteId();
                }}
            />
            <ModalEditUser
                userId={eidtId}
                show={modalEditUser}
                onClose = {
                    () => setModalEditUser(false)
                }
            />
        </div>
    );
}

export default AdminUser;