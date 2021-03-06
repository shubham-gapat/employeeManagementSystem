import React, { Component } from 'react';

import {authAxios} from '../store/utility';
import {
    Button,
    Container,
    Divider,
    Header,
    Modal,
    Icon,
    Form,
    Table
  } from "semantic-ui-react"

import {employeesListURL,
employeeCreateURL} from '../constants';
import { Link } from 'react-router-dom';


class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: [],
                activeEmployee:{
                    id:null,
                    firstname:"",
                    lastname:"",
                    email:"",
                    address:"",
                    dob:"",
                    company:"",
                    mobile:"",
                    city:""
                },
                error: null,
                loading: false,
                firstopen: false,
                secondopen: false,
                editing:false,
                open:false
        }
        this.startEdit = this.startEdit.bind(this)
        this.onClickEdit = this.onClickEdit.bind(this)
        this.getEmployees = this.getEmployees(this)
        this.handleChange = this.handleChange(this)
        this.setOpen = this.setOpen(this)

    }

    componentDidMount(){
        authAxios
        .get(employeesListURL, {
            headers:{
                'Authorization' : 'Bearer '+localStorage.getItem('token')
            }
        })
        .then(res => {
          this.setState({ employees: res.data.employees, loading: false });
        })
    }

    getEmployees=()=>{
        authAxios
        .get(employeesListURL, {
            headers:{
                'Authorization' : 'Bearer '+localStorage.getItem('token')
            }
        })
        .then(res => {
          this.setState({ employees: res.data.employees, loading: false });
        })
    }

    handleAddOrUpdate=(e)=>{
        e.preventDefault();
        console.log('ITEM:', this.state.activeEmployee)
    
        var url = employeeCreateURL
    
        if(this.state.editing === true){
          url = `http://127.0.0.1:8000/user/employees-update/${ this.state.activeItem.id}/`
          this.setState({
            editing:false
          })
        }
    
    
    
        authAxios
        .post(url, {
          headers:{
            'Authorization' : 'Bearer '+localStorage.getItem('token')
          },
          body:JSON.stringify(this.state.activeItem)
        }).then((response)  => {
            this.getEmployees()
            this.setState({
               activeItem:{
                id:null,
                firstname:"",
                lastname:"",
                email:"",
                address:"",
                dob:"",
                company:"",
                mobile:"",
                city:""
            }
            })
        }).catch(function(error){
          console.log('ERROR:', error)
        })
    
      }

    setFirstOpen = () =>{
        this.setState({ firstopen: !this.state.firstopen });
      };

    setSecondOpen = () =>{
        this.setState({ secondopen: !this.state.secondopen });
    };

    setOpen = () =>{
        this.setState({ open: !this.state.open });
      };

    startEdit=(employee)=>{
        this.setState({
          activeEmployee:employee,
          editing:true,
        }
        )
      }

    onClickEdit=(e,employee)=>{
        this.startEdit(employee);
        this.setFirstOpen();
        
    }

    onClickCreate=(e)=>{
        this.setFirstOpen();
        this.setSecondOpen();
        this.handleAddOrUpdate(e)
    }

    handleChange = input => e => {
        const { activeEmployee } = this.state;
        const updatedFormdata = {
            ...activeEmployee,
            [e.target.name]: e.target.value
        };
        this.setState({
            activeEmployee: updatedFormdata
        });
    };

    deleteItem(emplyee){
    
        authAxios
        .delete(`http://127.0.0.1:8000/uzer/employees-delete/${emplyee.id}/`, {
          headers:{
            'Content-type':'application/json',
          },
        }).then((response) =>{
    
          this.getEmployees()
        })
      }

      onClickDelete=(employee)=>{
        this.deleteItem(employee);
        this.setOpen()
    }
    

    render() {
        console.log('employees',this.state.employees)
        const {employees,firstopen,secondopen, activeEmployee} =this.state
        return (
            <Container>
                <Header as='h2'>Employees List</Header>
                <Container textAlign='right'>
                    <Button content='Add Employee' primary onClick={this.setFirstOpen}/>
                    <Link to='/checkout'><Button content='Subscribe' secondary /></Link>
                    <Modal
                        onClose={ this.setFirstOpen}
                        onOpen={ this.setFirstOpen}
                        open={firstopen}
                    >
                        <Modal.Header>Enter Employee Details</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Input fluid icon='user' placeholder='Enter First Name' name='firstname' value={activeEmployee.firstname} onChange={this.handleChange} />
                                <Form.Input fluid icon='user' placeholder='Enter Last Name' name='lastname' value={activeEmployee.lastname} onChange={this.handleChange} />
                                <Form.Input fluid icon='mail' placeholder='Enter E-Mail' name='email' value={activeEmployee.email} onChange={this.handleChange} />
                                <Form.Input fluid icon='home' placeholder='Enter Address' name='address' value={activeEmployee.address} onChange={this.handleChange} />
                                <Form.Input fluid icon='calendar' placeholder='Enter Date of Birth' name='dob' value={activeEmployee.dob} onChange={this.handleChange} />
                                <Form.Input fluid icon='industry' placeholder='Enter Comapny Name' name='company' value={activeEmployee.company} onChange={this.handleChange} />
                                <Form.Input fluid icon='phone' placeholder='Enter Mobile No' name='mobile' value={activeEmployee.mobile} onChange={this.handleChange} />
                                <Form.Input fluid icon='building' placeholder='Enter City' name='city' value={activeEmployee.city} onChange={this.handleChange} />
                            </Form>
                            
                        </Modal.Content>
                        <Modal.Actions>
                        <Button onClick={ this.setSecondOpen } primary>
                            Proceed <Icon name='right chevron' />
                        </Button>
                        </Modal.Actions>

                        <Modal
                        onClose={ this.setSecondOpen }
                        open={secondopen}
                        size='small'
                        >
                        <Modal.Header>Are you sure!</Modal.Header>
                        <Modal.Content>
                            <p>Are you sure that you want to save these employee details</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button
                            icon='check'
                            content='All Done'
                            onClick={ (e)=>this.onClickCreate(e)}
                            />
                        </Modal.Actions>
                        </Modal>
                    </Modal>
                </Container>
                <Divider />
                <Container>
                <Table singleLine>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>E-mail</Table.HeaderCell>
                        <Table.HeaderCell>Mob No.</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            employees.map((employee,index) => { return(
                                <Table.Row key={index}>
                                    <Table.Cell>{employee.id}</Table.Cell>
                                    <Table.Cell>{employee.firstname}</Table.Cell>
                                    <Table.Cell>{employee.lastname}</Table.Cell>
                                    <Table.Cell>{employee.email}</Table.Cell>
                                    <Table.Cell>{employee.mobile}</Table.Cell>
                                    <Table.Cell>
                                        <Button content='Edit' onClick={(employee)=>this.onClickEdit(employee)}/>
                                        
                                        <Button content='Remove' onClick={this.setOpen} />
                                    </Table.Cell>
                                </Table.Row>
                            )
                            })
                            
                        }
                    </Table.Body>
                </Table>
                </Container>
            </Container>
        )
    }
}

export default ListEmployeeComponent ;
