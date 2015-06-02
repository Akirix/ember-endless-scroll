import Ember from 'ember';

export default Ember.Route.extend( {
    model: function( params ){

        //var usersPageOne = [
        //    { name: 'John Doe', id: 1 },
        //    { name: 'Jane Doe', id: 2 },
        //    { name: 'Joe Doe', id: 3 },
        //    { name: 'Jill Doe', id: 4 }
        //];
        //
        ////var usersPageTwo = [
        ////    { name: 'John Doe', id: 5 },
        ////    { name: 'John Doe', id: 6 },
        ////    { name: 'John Doe', id: 7 },
        ////    { name: 'John Doe', id: 8 }
        ////];
        //
        //return { users: Ember.A( usersPageOne ) };

        return this.store.find( 'user' );
    }
} );
