

class UserProfileController {

    async getUserAll(req, res) {
   
        try {
            const user = { email: req.session.email, isAdmin: req.session.isAdmin };
            return res.render('user', { user: user });
        } catch (error) {
            throw error;
        
        }
    }

    async getAdmin(req,res){
        try {
            return res.render('inicioAdmin');
        } catch (error) {
            throw error;
        }
   
    }
}

module.exports = UserProfileController;