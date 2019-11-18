import React, { Component } from 'react';
import DisplayList from './EmailList'
import './App.css';


export default class componentName extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();   // ref of DOM element
        this.state = {
            list: ['saasanimanav@gmail.com',
                'mnbvcgasgaanav@gmail.com',
                'hgfdsgasgasgnimanav@gmail.com', 'jethaniasfasfnav@gmail.com'], // defaut list of emails
            filterList: [], // filtered data on search
            disabled: true, //  disable deletaall and disable all button
            disableSelectAll: false    //disable select all button
        }
    }

    handleOnClick = (e) => {
        // Validation on email
        if (this.myRef.current.value === "") {          // input is not empty
            return alert('input cannot be empty')
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.myRef.current.value))) {    // For Valid email format
            return alert('email id format invalid')
        }
        let valueToInsert = this.myRef.current.value
        let stateCopy = [...this.state.list]
        let duplicate = stateCopy.filter((data) => {
            return data === valueToInsert
        })
        if (duplicate.length > 0) {                     // if email already present
            return alert('email already present')
        }
        this.myRef.current.value = ""
        this.setState({ list: [...this.state.list, valueToInsert] })
    }

    handleDelete = (row, index) => {                // delete a single line item
        let data = [...this.state.list]
        let indexOfRow = data.indexOf(row)
        data.splice(indexOfRow, 1)
        this.setState({ list: data })
    }

    handleDisable = (e, row, index, ref) => {       // disable single line item
        if (e.target.innerText === 'Disable') {
            ref[index].disabled = true
            e.target.innerText = 'Enable'
        }
        else if (e.target.innerText === 'Enable') {     // change cursor name to enable
            ref[index].disabled = false
            e.target.innerText = 'Disable'
        }
    }

    HandleSelectAll = (e, ref) => {                     // To select all list items
        if (e.target.innerText === 'Select All') {
            for (let i = 0; i < ref.length; i++) {
                if (ref[i] !== null)
                    ref[i].checked = true
            }
            e.target.innerText = 'Unselect All'
            this.setState({ disabled: false })
        }

        else if (e.target.innerText === 'Unselect All') {   // To unselect all list items
            for (let i = 0; i < ref.length; i++) {
                if (ref[i] !== null)
                    ref[i].checked = false
            }
            e.target.innerText = 'Select All'
            this.setState({ disabled: true })
        }
    }

    filterList = (e) => {                                   // filter a list with user input
        this.setState({ filterList: e.target.value })
    }

    handleDelelteAll = (ref) => {                           // delete all the line items
        this.setState({ list: [], disableSelectAll: true })
    }

    handleDisableAll = (e, ref) => {                        // disable all line items
        if (e.target.innerText === 'Disable All') {
            for (let i = 0; i < ref.length; i++) {
                if (ref[i] !== null)
                    ref[i].disabled = true
            }
            e.target.innerText = 'Enable All'
            this.setState({ disableSelectAll: true })
        }
        else if (e.target.innerText === 'Enable All') {
            for (let i = 0; i < ref.length; i++) {
                if (ref[i] !== null)
                    ref[i].disabled = false
            }
            e.target.innerText = 'Disable All'
            this.setState({ disableSelectAll: false })
        }
    }



    render() {
        const filterListData = this.state.list.filter(data => {
            return data.indexOf(this.state.filterList) !== -1
        })
        return (
            <>
                <header className="header">Email List</header>
                <div className="form-div">
                    <label className="label">Email</label>
                    <input type="email" ref={this.myRef} onChange={this.handleChange}
                        placeholder="Type email here"
                        className="email-input"
                    />
                    <button onClick={this.handleOnClick} className="button">Add</button>
                </div>
                <div className="render-list-component">
                    <DisplayList List={filterListData.length > 0 ? filterListData : this.state.list}
                        handleRowdelete={this.handleDelete}
                        filterList={this.filterList}
                        handleDisable={this.handleDisable}
                        HandleSelectAll={this.HandleSelectAll}
                        handleDeleteAll={this.handleDelelteAll}
                        handleDisableAll={this.handleDisableAll}
                        disabled={this.state.disabled}
                        handleOnCheck={this.handleOnCheck}
                        handleSort={this.handleSort}
                        disableSelectAll={this.state.disableSelectAll}
                    />
                </div>
            </>
        );
    }
}
