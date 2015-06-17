import Ember from 'ember';
const computed = Ember.computed;
const observer = Ember.observer;

export default Ember.Mixin.create( {
    setupController: function( controller, model ){
        this._super.apply( this, arguments );

        this.set( 'currentController', controller );

        if( Ember.typeOf( model.meta ) === 'object' && Ember.typeOf( model.meta.total_pages ) ){
            controller.set( 'total_pages', model.meta.total_pages );

            controller.set( 'hasMorePages', computed( 'total_pages', 'page', function(){
                var totalPages = controller.get( 'total_pages' );
                var page = controller.get( 'page' );
                return Ember.typeOf( totalPages ) === 'number' && Ember.typeOf( page ) === 'number' && page < totalPages;
            } ) );
        }
    },

    actions: {
        next: function(){
            var _this = this;
            var currentController = this.get( 'currentController' );
            var page = this.get( 'page' );
            var previousModel = currentController.get( 'model' );
            var resultModel = [];

            if( currentController.get( 'hasMorePages' ) ){
                page = currentController.incrementProperty( 'page' );

                _this.refresh().promise.then( function( result ){
                    resultModel.pushObjects( previousModel.toArray() );
                    resultModel.pushObjects( currentController.get( 'model' ).toArray() );
                    currentController.set( 'model', resultModel );
                } );
            }
        }
    }
} );