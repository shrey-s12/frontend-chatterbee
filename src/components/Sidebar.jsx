import React, { useEffect, useState } from 'react'
import useChatStore from '../store/useChatStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { Users } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const [showOnlyOnline, setShowOnlyOnline] = useState(false);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const filteredUsers = showOnlyOnline ? users.filter(user => onlineUsers.includes(user._id)) : users;

    if (isUsersLoading) return <SidebarSkeleton />

    return (
        <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
            <div className='border-b border-base-300 p-5 w-full'>
                <div className='flex items-center gap-2'>
                    <Users className='w-6 h-6' />
                    <span className='font-medium hidden lg:block'>Contacts</span>
                </div>

                <div className='mt-3 hidden lg:flex items-center gap-2'>
                    <label className='cursor-pointer flex items-center gap-2'>
                        <input
                            type='checkbox'
                            checked={showOnlyOnline}
                            onChange={(e) => setShowOnlyOnline(e.target.checked)}
                            className='checkbox checkbox-sm'
                        />
                        <span className='text-sm'>Show only online</span>
                    </label>
                    <span className='text-xs text-zinc-500'>({onlineUsers.length - 1} online)</span>
                </div>
            </div>

            <div className='overflow-y-auto w-full py-3'>
                {filteredUsers.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`w-full flex items-center gap-3 p-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300' : ''}`}
                    >
                        <div className='relative mx-auto lg:mx-0'>
                            <img
                                src={user.profilePic}
                                alt={user.name}
                                className='rounded-full w-12 h-12 object-cover'
                            />
                            {onlineUsers.includes(user._id) && (
                                <span
                                    className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900'
                                />
                            )}
                        </div>

                        {/* User Info - only visible on large screen */}
                        <div className='hidden lg:block text-left min-w-0'>
                            <div className='font-medium truncate'>{user.fullName}</div>
                            <div className='text-sm text-zinc-400'>
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}

                {filteredUsers.length === 0 && (
                    <div className='flex items-center justify-center h-full text-zinc-500'>
                        No online user
                    </div>
                )}
            </div>
        </aside>
    )
}

export default Sidebar