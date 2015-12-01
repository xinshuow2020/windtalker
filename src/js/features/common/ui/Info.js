/**
 *  Defines the Info Dialog
 *
 *  @author  Howard.Zuo
 *  @date    Nov 24, 2015
 *
 */
'use strict';

var FeatureBase = require('lib/FeatureBase');
var omit = require('lib/Omit');
var merge = require('angular').merge;

class Feature extends FeatureBase {
    constructor() {
        super('InfoModule');
    }

    beforeStart() {};

    infoListener(events, $mdDialog) {
        var defaults = {
            title: '确认',
            content: '',
            okTxt: '确定',
            onComplete: function() {}
        };

        events.on('info', function(data) {
            var opts = merge({}, defaults, omit(data, ['event']));

            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(false)
                    .title(opts.title)
                    .content(opts.content)
                    .ok(opts.okTxt)
                    .targetEvent(data.event)
            )
                .then(opts.onComplete);
        });
    }

    execute() {
        this.infoListener.$inject = ['events', '$mdDialog'];
        this.run(this.infoListener);
    }
}

module.exports = Feature;
