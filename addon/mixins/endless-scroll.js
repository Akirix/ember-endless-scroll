import Ember from 'ember';
const computed = Ember.computed;
const observer = Ember.observer;

export default Ember.Mixin.create( {
    current_page: 1,
    page: 1,
    per_page: 20,
    queryParams: [ 'page', 'per_page' ],
    loadingRecords: false,

    hasMorePages: computed( 'total_pages', 'current_page', function(){
        var totalPages = this.get( 'total_pages' );
        return typeof totalPages === 'number' && this.get( 'current_page' ) < totalPages;
    } ),

    actions: {
        next: function( modelName, params ){
            var _this = this;
            var currentPage = _this.get( 'current_page' );
            var page = _this.get( 'page' );
            var perPage = _this.get( 'per_page' );
            var model = _this.get( 'model' );

            if( this.get( 'hasMorePages' ) ){
                if( currentPage === null ){
                    _this.set( 'current_page', page + 1 );
                    currentPage = _this.get( 'current_page' );
                }
                else{
                    currentPage = _this.incrementProperty( 'current_page' );
                }

                var updateParams = {
                    page: currentPage,
                    per_page: perPage
                };
                params = Ember.merge( updateParams, params );

                _this.set( 'loadingRecords', true );
                _this.store.find( modelName, params )
                    .then( function( result ){
                        var resultModel = [];
                        resultModel.pushObjects( model.toArray() );
                        resultModel.pushObjects( result.toArray() );
                        _this.set( 'model', resultModel );
                    } )
                    .finally( function(){
                        _this.set( 'loadingRecords', false );
                    } );
            }
        }
    }
} );