'use strict';

describe('kaleoProject module', function() {
	var promiseMonitor, $q;

    beforeEach(module('kaleoProject'));
    beforeEach(inject(function(_promiseMonitor_, _$q_){
    	promiseMonitor = new (_promiseMonitor_)();
    	$q = _$q_;
    }));


    describe('promise montior service', function() {
        it('should init correctly', function(){
            expect(!!promiseMonitor.monitor).toBe(true);
            expect(!!promiseMonitor.isPending).toBe(true);
        });


        it('should monitor', function() {
            var promise = $q.defer();

            promiseMonitor.monitor(promise.promise);

            expect(promiseMonitor.isPending()).toBe(true);

            promise.resolve({});

            expect(promiseMonitor.isPending()).toBe(false);
        });
    });
});
