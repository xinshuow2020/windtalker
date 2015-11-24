/**
 *  Defines the Dialog
 *
 *  @author  Howard.Zuo
 *  @date    Nov 22, 2015
 *
 */
'use strict';

var FeatureBase = require('lib/FeatureBase');
var omit = require('lib/Omit');
var merge = require('angular').merge;

class Feature extends FeatureBase {
    constructor() {
        super('DialogModule');
    }

    beforeStart() {};

    execute() {

        var defaults = {
            template: '',
            onComplete: function() {}
        };

        this.run([
            'events',
            '$mdDialog',
            function(events, $mdDialog) {

                events.on('dialog', function(data) {
                    var opts = merge({}, defaults, omit(data, [
                        'scope'
                    ]));
                    $mdDialog.show({
                        scope: opts.scope,
                        targetEvent: opts.event,
                        template: opts.template,
                        onComplete: opts.onComplete
                    });
                });
            }
        ]);
    }
}

module.exports = Feature;