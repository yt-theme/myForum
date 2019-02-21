class Base {
    constructor (arg1, arg2) {
        this.arg1 = arg1
        this.arg2 = arg2
    }

    save () {
        console.log('save', this.arg1)
    }

    update () {
        console.log('update', this.arg2)
    }
}

class User extends Base {
    constructor (arg1, arg2, arg3) {
        super(arg1, arg2)
        this.arg3 = arg3
    }

    remove () {
        console.log('uremove', this.arg3)
    }

    update () {
        console.log('uupdate', this.arg3)
    }
}

user = new User('a', 'b', 'c')
user.save()
user.update()
user.remove()