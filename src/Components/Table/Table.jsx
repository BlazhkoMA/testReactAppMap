import React, { useState} from 'react';
import {useDispatch } from "react-redux";
import {Select, Table} from "antd";
import {Option} from "antd/es/mentions";
import {asyncDestinationCityCreator, asyncSourceCityCreator} from "../../store/dataReducer";

const TableComponent = () => {

    const dispatch = useDispatch()
    const [selectedRow, setSelectedRow] = useState(null)

    const selectData = [
        {
            label: 'исторический район Рублёвики',
            value: '59.960903, 30.443152'
        },
        {
            label: 'муниципальный округ Литейный',
            value: '59.945101, 30.339881'
        },
        {
            label: 'муниципальный округ Адмиралтейский',
            value: '59.925997, 30.306625'
        },
        {
            label: '2-й Адмиралтейский остров',
            value: '59.930719, 30.288903'
        },
        {
            label: 'муниципальный округ Измайловское',
            value: '59.905343, 30.317346'
        },
        {
            label: 'муниципальный округ Невский',
            value: '59.915876, 30.458305'
        },
        {
            label: 'исторический район Канцевская сторона',
            value: '59.940179, 30.417681'
        },
        {
            label: 'Муринское городское поселение',
            value: '60.049923, 30.441914'
        },
    ]
    const [data, setData] = useState([
        {
            key: '1',
            id: '1',
            title: 'Заявка один',
            loading: null,
            unloading: null
        },
        {
            key: '2',
            id: '2',
            title: 'Заявка два',
            loading: null,
            unloading: null
        },
    ])
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: text => <div style={{minWidth: '50px'}}>{text}</div>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: text => <div style={{minWidth: '150px'}}>{text}</div>,
        },
        {
            title: 'Loading',
            dataIndex: 'loading',
            key: 'loading',
            render: (text, record, index) => {
                return (
                    <div style={{minWidth: '150px', maxWidth: '200px'}}>
                        <Select defaultValue={text} style={{ width: '100%' }} onChange={(value) => {
                            setData(data.map(el => (el.id === record.id ? {...el, loading: value} : el)))
                            if(record.id === selectedRow){
                                dispatch(asyncSourceCityCreator(
                                    {
                                        lat: value.split(', ')[0],
                                        lng: value.split(', ')[1]
                                    }))
                            }
                        }} >
                            {
                                selectData.map(item => {
                                    return (
                                        <Option value={item.value}>{item.label}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                )
            },
        },
        {
            title: 'Unloading',
            dataIndex: 'unloading',
            key: 'unloading',
            render: (text, record) => {
                return (
                    <div style={{minWidth: '150px', maxWidth: '200px'}}>
                        <Select defaultValue={text} style={{ width: '100%' }}  onChange={(value) => {
                            setData(data.map(el => (el.id === record.id ? {...el, unloading: value} : el)))
                            if(record.id === selectedRow){
                                dispatch(asyncDestinationCityCreator(
                                    {
                                        lat: value.split(', ')[0],
                                        lng: value.split(', ')[1]
                                    }))
                            }
                        }}>
                            {
                                selectData.map(item => {
                                    return (
                                        <Option value={item.value}>{item.label}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                )
            },
        },
    ]
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRow(selectedRowKeys[0])
            const element = data.filter(item => item.key === selectedRowKeys[0])[0]
            setSelectedRow(element.id)
            dispatch(asyncSourceCityCreator(
                element.loading ? {
                    lat: element.loading.split(', ')[0],
                    lng: element.loading.split(', ')[1]
                } : null))
            dispatch(asyncDestinationCityCreator(
                element.unloading ? {
                    lat: element.unloading.split(', ')[0],
                    lng: element.unloading.split(', ')[1]
                } : null))
        },
        getCheckboxProps: (record) => {
            return {
                name: record.id,
            }
        },
    };
    return (
        <div style={{overflowX: 'auto'}}>
            <Table
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </div>
    );
};

export default TableComponent;