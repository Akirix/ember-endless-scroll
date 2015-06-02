import Ember from 'ember';
import DS from 'ember-data';

const computed = Ember.computed;
const observer = Ember.observer;

export default DS.Model.extend( {
    firstName: DS.attr(),
    lastName: DS.attr(),
    name: computed( 'firstName', 'lastName', function(){
        return this.get( 'firstName' ) + ' ' + this.get( 'lastName' );
    } )
} );

