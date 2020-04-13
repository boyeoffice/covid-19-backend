const login = {
	validDetails: {
		email: 'admin@example.com',
		password: '123456'
	},
	invalidEmail: {
      email: 'april@example.com',
      password: '123456'
  },
  invalidPassword: {
      email: 'admin@example.com',
      password: 'fool'
  }
}

const createUser = {
  emptyData: {
    firstname: '',
    lastname: ''
  },
  validDetails: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    password: '123456',
    job_role: 'Software Developer',
    department: 'ICT',
    is_admin: false,
    gender: 'Male',
    address: '23, Saint John Street'
  },
  invalidDetails: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'admin@example.com',
    password: '123456',
    job_role: 'Software Developer',
    department: 'ICT',
    is_admin: false,
    gender: 'Male',
    address: '23, Saint John Street'
  }
}

module.exports = {
	login,
  createUser
}