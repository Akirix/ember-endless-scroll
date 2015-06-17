import Ember from 'ember';
const computed = Ember.computed;
const observer = Ember.observer;

export default Ember.Mixin.create( {
    beforeModel: function( transition ){
        this._super.apply( this, arguments );

        var page = parseInt( transition.queryParams.page );
        if( Ember.typeOf( transition.intent.url ) === 'string' && !isNaN( page ) && page !== 1 ){
            transition.abort();
            this.transitionTo( transition.intent.url.replace( /page=[0-9]*/g, "page=1" ) );
        }
    },

    setupController: function( controller, model ){
        this._super.apply( this, arguments );

        this.set( 'currentController', controller );

        if( Ember.typeOf( model.meta ) === 'object' && Ember.typeOf( model.meta.total_pages ) ){
            controller.set( 'total_pages', model.meta.total_pages );

            controller.set( 'hasMorePages', computed( 'total_pages', 'page', function(){
                var totalPages = controller.get( 'total_pages' );
                return typeof totalPages === 'number' && controller.get( 'page' ) < totalPages;
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
                    resultModel.pushObjects( result.context.toArray() );
                    currentController.set( 'model', resultModel );
                } );
            }
        }
    }
} );