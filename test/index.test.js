import test from 'ava';
import m from '..';

test('Parse GitHub issue', t => {
	t.deepEqual(
		m('GitHub')(
			'Fix #1 reSOLved gh-2 CLOSES Gh-3 fix o/r#4 #5 o/r#6 fix https://github.com/o/r/issues/7 https://github.com/o/r/issues/8 fix https://github.com/o/r/pull/9 https://github.com/o/r/pull/10 fixing #11 Duplicate OF #12 @user'
		),
		{
			actions: {
				close: [
					{raw: 'Fix #1', action: 'Fix', slug: undefined, prefix: '#', issue: '1'},
					{raw: 'reSOLved gh-2', action: 'Resolved', slug: undefined, prefix: 'gh-', issue: '2'},
					{raw: 'CLOSES Gh-3', action: 'Closes', slug: undefined, prefix: 'Gh-', issue: '3'},
					{raw: 'fix o/r#4', action: 'Fix', slug: 'o/r', prefix: '#', issue: '4'},
					{raw: 'fix https://github.com/o/r/issues/7', action: 'Fix', slug: 'o/r', prefix: undefined, issue: '7'},
					{raw: 'fix https://github.com/o/r/pull/9', action: 'Fix', slug: 'o/r', prefix: undefined, issue: '9'},
				],
				duplicate: [{raw: 'Duplicate OF #12', action: 'Duplicate of', slug: undefined, prefix: '#', issue: '12'}],
			},
			refs: [
				{raw: '#5', slug: undefined, prefix: '#', issue: '5'},
				{raw: 'o/r#6', slug: 'o/r', prefix: '#', issue: '6'},
				{raw: 'https://github.com/o/r/issues/8', slug: 'o/r', prefix: undefined, issue: '8'},
				{raw: 'https://github.com/o/r/pull/10', slug: 'o/r', prefix: undefined, issue: '10'},
				{raw: '#11', slug: undefined, prefix: '#', issue: '11'},
			],
			mentions: [{raw: '@user', prefix: '@', user: 'user'}],
		}
	);
});

test('Parse Bitbucket issue', t => {
	t.deepEqual(m('Bitbucket')('Fix #1 reSOLved #2 CLOSES #3 fix o/r#4 #5 o/r#6 fixing #7 /duplicate #8 @user'), {
		actions: {
			close: [
				{raw: 'Fix #1', action: 'Fix', slug: undefined, prefix: '#', issue: '1'},
				{raw: 'reSOLved #2', action: 'Resolved', slug: undefined, prefix: '#', issue: '2'},
				{raw: 'CLOSES #3', action: 'Closes', slug: undefined, prefix: '#', issue: '3'},
				{raw: 'fix o/r#4', action: 'Fix', slug: 'o/r', prefix: '#', issue: '4'},
				{raw: 'fixing #7', action: 'Fixing', slug: undefined, prefix: '#', issue: '7'},
			],
		},
		refs: [
			{raw: '#5', slug: undefined, prefix: '#', issue: '5'},
			{raw: 'o/r#6', slug: 'o/r', prefix: '#', issue: '6'},
			{raw: '#8', slug: undefined, prefix: '#', issue: '8'},
		],
		mentions: [{raw: '@user', prefix: '@', user: 'user'}],
	});
});

test('Parse GitLab issue', t => {
	t.deepEqual(
		m('GitLab')(
			'Fix #1 reSOLved #2 IMPLEMENT #3 fix g/sg/o/r#4 #5 o/r#6 fix https://gitlab.com/o/r/issues/7 https://gitlab.com/o/r/issues/8 fix https://gitlab.com/o/r/merge_requests/9 https://gitlab.com/o/r/merge_requests/10 fixing #11 fixing !12 /duplicate #13 @user'
		),
		{
			actions: {
				close: [
					{raw: 'Fix #1', action: 'Fix', slug: undefined, prefix: '#', issue: '1'},
					{raw: 'reSOLved #2', action: 'Resolved', slug: undefined, prefix: '#', issue: '2'},
					{raw: 'IMPLEMENT #3', action: 'Implement', slug: undefined, prefix: '#', issue: '3'},
					{raw: 'fix g/sg/o/r#4', action: 'Fix', slug: 'g/sg/o/r', prefix: '#', issue: '4'},
					{raw: 'fix https://gitlab.com/o/r/issues/7', action: 'Fix', slug: 'o/r', prefix: undefined, issue: '7'},
					{
						raw: 'fix https://gitlab.com/o/r/merge_requests/9',
						action: 'Fix',
						slug: 'o/r',
						prefix: undefined,
						issue: '9',
					},
					{raw: 'fixing #11', action: 'Fixing', slug: undefined, prefix: '#', issue: '11'},
					{raw: 'fixing !12', action: 'Fixing', slug: undefined, prefix: '!', issue: '12'},
				],
				duplicate: [{raw: '/duplicate #13', action: '/duplicate', slug: undefined, prefix: '#', issue: '13'}],
			},
			refs: [
				{raw: '#5', slug: undefined, prefix: '#', issue: '5'},
				{raw: 'o/r#6', slug: 'o/r', prefix: '#', issue: '6'},
				{raw: 'https://gitlab.com/o/r/issues/8', slug: 'o/r', prefix: undefined, issue: '8'},
				{raw: 'https://gitlab.com/o/r/merge_requests/10', slug: 'o/r', prefix: undefined, issue: '10'},
			],
			mentions: [{raw: '@user', prefix: '@', user: 'user'}],
		}
	);
});

test('Parse Waffle issue', t => {
	t.deepEqual(
		m('Waffle')(
			'Fix #1 reSOLved gh-2 CLOSES Gh-3 fix o/r#4 #5 o/r#6 fix https://github.com/o/r/issues/7 https://github.com/o/r/issues/8 fix https://github.com/o/r/pull/9 https://github.com/o/r/pull/10 fixing #11 Duplicate OF #12 @user BloCks #13 Requires o/r#14 parent of https://github.com/o/r/issues/15 child to Gh-16'
		),
		{
			actions: {
				close: [
					{raw: 'Fix #1', action: 'Fix', slug: undefined, prefix: '#', issue: '1'},
					{raw: 'reSOLved gh-2', action: 'Resolved', slug: undefined, prefix: 'gh-', issue: '2'},
					{raw: 'CLOSES Gh-3', action: 'Closes', slug: undefined, prefix: 'Gh-', issue: '3'},
					{raw: 'fix o/r#4', action: 'Fix', slug: 'o/r', prefix: '#', issue: '4'},
					{raw: 'fix https://github.com/o/r/issues/7', action: 'Fix', slug: 'o/r', prefix: undefined, issue: '7'},
					{raw: 'fix https://github.com/o/r/pull/9', action: 'Fix', slug: 'o/r', prefix: undefined, issue: '9'},
				],
				block: [{raw: 'BloCks #13', action: 'Blocks', slug: undefined, prefix: '#', issue: '13'}],
				require: [{raw: 'Requires o/r#14', action: 'Requires', slug: 'o/r', prefix: '#', issue: '14'}],
				parentOf: [
					{
						raw: 'parent of https://github.com/o/r/issues/15',
						action: 'Parent of',
						slug: 'o/r',
						prefix: undefined,
						issue: '15',
					},
				],
				childOf: [{raw: 'child to Gh-16', action: 'Child to', slug: undefined, prefix: 'Gh-', issue: '16'}],
				duplicate: [{raw: 'Duplicate OF #12', action: 'Duplicate of', slug: undefined, prefix: '#', issue: '12'}],
			},
			refs: [
				{raw: '#5', slug: undefined, prefix: '#', issue: '5'},
				{raw: 'o/r#6', slug: 'o/r', prefix: '#', issue: '6'},
				{raw: 'https://github.com/o/r/issues/8', slug: 'o/r', prefix: undefined, issue: '8'},
				{raw: 'https://github.com/o/r/pull/10', slug: 'o/r', prefix: undefined, issue: '10'},
				{raw: '#11', slug: undefined, prefix: '#', issue: '11'},
			],
			mentions: [{raw: '@user', prefix: '@', user: 'user'}],
		}
	);
});

test('Parse with default options', t => {
	t.deepEqual(
		m()(
			'Fix #1 reSOLved gh-2 CLOSES Gh-3 fix o/r#4 #5 o/r#6 implementing #7 https://github.com/o/r/issues/8 implementing https://github.com/o/r/issues/9 Duplicate OF #10 @user'
		),
		{
			actions: {
				close: [
					{raw: 'Fix #1', action: 'Fix', slug: undefined, prefix: '#', issue: '1'},
					{raw: 'reSOLved gh-2', action: 'Resolved', slug: undefined, prefix: 'gh-', issue: '2'},
					{raw: 'CLOSES Gh-3', action: 'Closes', slug: undefined, prefix: 'Gh-', issue: '3'},
					{raw: 'fix o/r#4', action: 'Fix', slug: 'o/r', prefix: '#', issue: '4'},
					{raw: 'implementing #7', action: 'Implementing', slug: undefined, prefix: '#', issue: '7'},
					{
						raw: 'implementing https://github.com/o/r/issues/9',
						action: 'Implementing',
						slug: 'o/r',
						prefix: undefined,
						issue: '9',
					},
				],
				block: [],
				require: [],
				parentOf: [],
				childOf: [],
				duplicate: [{raw: 'Duplicate OF #10', action: 'Duplicate of', slug: undefined, prefix: '#', issue: '10'}],
			},
			refs: [
				{raw: '#5', slug: undefined, prefix: '#', issue: '5'},
				{raw: 'o/r#6', slug: 'o/r', prefix: '#', issue: '6'},
				{raw: 'https://github.com/o/r/issues/8', slug: 'o/r', prefix: undefined, issue: '8'},
			],
			mentions: [{raw: '@user', prefix: '@', user: 'user'}],
		}
	);
});

test('Parse with custom options', t => {
	t.deepEqual(
		m({
			actions: {close: ['fix'], fix: ['fix'], duplicate: undefined},
			mentionsPrefixes: '!',
			issuePrefixes: ['#'],
			hosts: ['http://host1.com/', 'http://host2.com'],
			issueURLSegments: ['bugs'],
		})(
			'Fix #1 reSOLved gh-2 CLOSES Gh-3 fixed o/r#4 #5 o/r#6 fixing #7 http://host1.com/o/r/bugs/8 http://host2.com/o/r/bugs/9 Duplicate OF #10 !user @other'
		),
		{
			actions: {
				close: [{raw: 'Fix #1', action: 'Fix', slug: undefined, prefix: '#', issue: '1'}],
				fix: [{raw: 'Fix #1', action: 'Fix', slug: undefined, prefix: '#', issue: '1'}],
				block: [],
				require: [],
				parentOf: [],
				childOf: [],
			},
			refs: [
				{raw: 'o/r#4', slug: 'o/r', prefix: '#', issue: '4'},
				{raw: '#5', slug: undefined, prefix: '#', issue: '5'},
				{raw: 'o/r#6', slug: 'o/r', prefix: '#', issue: '6'},
				{raw: '#7', slug: undefined, prefix: '#', issue: '7'},
				{raw: 'http://host1.com/o/r/bugs/8', slug: 'o/r', prefix: undefined, issue: '8'},
				{raw: 'http://host2.com/o/r/bugs/9', slug: 'o/r', prefix: undefined, issue: '9'},
				{raw: '#10', slug: undefined, prefix: '#', issue: '10'},
			],
			mentions: [{raw: '!user', prefix: '!', user: 'user'}],
		}
	);
});

test('Parse with options overrides', t => {
	t.deepEqual(
		m('default', {
			actions: {close: ['fix'], duplicate: false},
			mentionsPrefixes: '!',
			issuePrefixes: ['#'],
			hosts: ['http://host1.com/', 'http://host2.com'],
			issueURLSegments: ['bugs'],
		})(
			'Fix #1 reSOLved gh-2 CLOSES Gh-3 fixed o/r#4 #5 o/r#6 fixing #7 http://host1.com/o/r/bugs/8 http://host2.com/o/r/bugs/9 Duplicate OF #10 !user @other'
		),
		{
			actions: {
				close: [{raw: 'Fix #1', action: 'Fix', slug: undefined, prefix: '#', issue: '1'}],
				block: [],
				require: [],
				parentOf: [],
				childOf: [],
			},
			refs: [
				{raw: 'o/r#4', slug: 'o/r', prefix: '#', issue: '4'},
				{raw: '#5', slug: undefined, prefix: '#', issue: '5'},
				{raw: 'o/r#6', slug: 'o/r', prefix: '#', issue: '6'},
				{raw: '#7', slug: undefined, prefix: '#', issue: '7'},
				{raw: 'http://host1.com/o/r/bugs/8', slug: 'o/r', prefix: undefined, issue: '8'},
				{raw: 'http://host2.com/o/r/bugs/9', slug: 'o/r', prefix: undefined, issue: '9'},
				{raw: '#10', slug: undefined, prefix: '#', issue: '10'},
			],
			mentions: [{raw: '!user', prefix: '!', user: 'user'}],
		}
	);
});

test('"allRefs" returns deduped refs and actions', t => {
	t.deepEqual(m('github', {actions: {fix: ['fix']}})('Fix #1 #2 Duplicate of #3').allRefs, [
		{raw: '#2', slug: undefined, prefix: '#', issue: '2'},
		{raw: 'Fix #1', action: 'Fix', slug: undefined, prefix: '#', issue: '1'},
		{raw: 'Duplicate of #3', action: 'Duplicate of', slug: undefined, prefix: '#', issue: '3'},
	]);
});

test('Ignore malformed references', t => {
	const empty = {actions: {close: [], duplicate: []}, mentions: [], refs: []};

	t.deepEqual(m('github')('Test#3'), empty);
	t.deepEqual(m('github')('Fix repo#3'), empty);
	t.deepEqual(m('github')('#3a'), empty);
	t.deepEqual(m('github')('Fix 3'), empty);
	t.deepEqual(m('github')('Fix #3a'), empty);
});

test('Parse references', t => {
	t.deepEqual(m('github')('#1,#2').refs, [
		{issue: '1', slug: undefined, prefix: '#', raw: '#1'},
		{issue: '2', slug: undefined, prefix: '#', raw: '#2'},
	]);
	t.deepEqual(m('github')('test ##1').refs, [{issue: '1', slug: undefined, prefix: '#', raw: '##1'}]);
	t.deepEqual(m('github')('#1#2').refs, [{issue: '1', slug: undefined, prefix: '#', raw: '#1'}]);
	t.deepEqual(m('github')('Fix #1Fix #2').refs, [{issue: '2', slug: undefined, prefix: '#', raw: '#2'}]);
});

test('Parse actions.close', t => {
	t.deepEqual(m('github')('Fix #1, Fix #2').actions.close, [
		{issue: '1', action: 'Fix', slug: undefined, prefix: '#', raw: 'Fix #1'},
		{issue: '2', action: 'Fix', slug: undefined, prefix: '#', raw: 'Fix #2'},
	]);
	t.deepEqual(m('github')('Fix #1,Fix #2').actions.close, [
		{issue: '1', action: 'Fix', slug: undefined, prefix: '#', raw: 'Fix #1'},
		{issue: '2', action: 'Fix', slug: undefined, prefix: '#', raw: 'Fix #2'},
	]);
	t.deepEqual(m('github')('fix #1, CLOSE #2').actions.close, [
		{issue: '1', action: 'Fix', slug: undefined, prefix: '#', raw: 'fix #1'},
		{issue: '2', action: 'Close', slug: undefined, prefix: '#', raw: 'CLOSE #2'},
	]);
});

test('Parse actions.block', t => {
	t.deepEqual(m('waffle')('Blocks #1, Block #2').actions.block, [
		{issue: '1', action: 'Blocks', slug: undefined, prefix: '#', raw: 'Blocks #1'},
		{issue: '2', action: 'Block', slug: undefined, prefix: '#', raw: 'Block #2'},
	]);
	t.deepEqual(m('waffle')('Blocks #1,Block #2').actions.block, [
		{issue: '1', action: 'Blocks', slug: undefined, prefix: '#', raw: 'Blocks #1'},
		{issue: '2', action: 'Block', slug: undefined, prefix: '#', raw: 'Block #2'},
	]);
	t.deepEqual(m('waffle')('blocks #1, BLOCK #2').actions.block, [
		{issue: '1', action: 'Blocks', slug: undefined, prefix: '#', raw: 'blocks #1'},
		{issue: '2', action: 'Block', slug: undefined, prefix: '#', raw: 'BLOCK #2'},
	]);
});

test('Parse actions.require', t => {
	t.deepEqual(m('waffle')('Requires #1, Require #2').actions.require, [
		{issue: '1', action: 'Requires', slug: undefined, prefix: '#', raw: 'Requires #1'},
		{issue: '2', action: 'Require', slug: undefined, prefix: '#', raw: 'Require #2'},
	]);
	t.deepEqual(m('waffle')('Requires #1,Require #2').actions.require, [
		{issue: '1', action: 'Requires', slug: undefined, prefix: '#', raw: 'Requires #1'},
		{issue: '2', action: 'Require', slug: undefined, prefix: '#', raw: 'Require #2'},
	]);
	t.deepEqual(m('waffle')('requires #1, REQUIRE #2').actions.require, [
		{issue: '1', action: 'Requires', slug: undefined, prefix: '#', raw: 'requires #1'},
		{issue: '2', action: 'Require', slug: undefined, prefix: '#', raw: 'REQUIRE #2'},
	]);
});

test('Parse actions.parentOf', t => {
	t.deepEqual(m('waffle')('Parent of #1, Parent to #2').actions.parentOf, [
		{issue: '1', action: 'Parent of', slug: undefined, prefix: '#', raw: 'Parent of #1'},
		{issue: '2', action: 'Parent to', slug: undefined, prefix: '#', raw: 'Parent to #2'},
	]);
	t.deepEqual(m('waffle')('Parent of #1,Parent to #2').actions.parentOf, [
		{issue: '1', action: 'Parent of', slug: undefined, prefix: '#', raw: 'Parent of #1'},
		{issue: '2', action: 'Parent to', slug: undefined, prefix: '#', raw: 'Parent to #2'},
	]);
	t.deepEqual(m('waffle')('parent of #1, PARENT TO #2').actions.parentOf, [
		{issue: '1', action: 'Parent of', slug: undefined, prefix: '#', raw: 'parent of #1'},
		{issue: '2', action: 'Parent to', slug: undefined, prefix: '#', raw: 'PARENT TO #2'},
	]);
});

test('Parse actions.childOf', t => {
	t.deepEqual(m('waffle')('Child of #1, Child to #2').actions.childOf, [
		{issue: '1', action: 'Child of', slug: undefined, prefix: '#', raw: 'Child of #1'},
		{issue: '2', action: 'Child to', slug: undefined, prefix: '#', raw: 'Child to #2'},
	]);
	t.deepEqual(m('waffle')('Child of #1,Child to #2').actions.childOf, [
		{issue: '1', action: 'Child of', slug: undefined, prefix: '#', raw: 'Child of #1'},
		{issue: '2', action: 'Child to', slug: undefined, prefix: '#', raw: 'Child to #2'},
	]);
	t.deepEqual(m('waffle')('child of #1, CHILD TO #2').actions.childOf, [
		{issue: '1', action: 'Child of', slug: undefined, prefix: '#', raw: 'child of #1'},
		{issue: '2', action: 'Child to', slug: undefined, prefix: '#', raw: 'CHILD TO #2'},
	]);
});

test('Parse actions.duplicate', t => {
	t.deepEqual(m('github')('Duplicate of #1, DUPLICATE of #2').actions.duplicate, [
		{issue: '1', action: 'Duplicate of', slug: undefined, prefix: '#', raw: 'Duplicate of #1'},
		{issue: '2', action: 'Duplicate of', slug: undefined, prefix: '#', raw: 'DUPLICATE of #2'},
	]);
	t.deepEqual(m('gitlab')('/duplicate #1, /DUPLICATE #2').actions.duplicate, [
		{issue: '1', action: '/duplicate', slug: undefined, prefix: '#', raw: '/duplicate #1'},
		{issue: '2', action: '/duplicate', slug: undefined, prefix: '#', raw: '/DUPLICATE #2'},
	]);
});

test('Parse mentions', t => {
	t.deepEqual(m('github')('@user@@user').mentions, [
		{raw: '@user', prefix: '@', user: 'user'},
		{raw: '@user', prefix: '@', user: 'user'},
	]);
	t.deepEqual(m('github')('@user,@user').mentions, [
		{raw: '@user', prefix: '@', user: 'user'},
		{raw: '@user', prefix: '@', user: 'user'},
	]);
	t.deepEqual(m('github')('@user, @user').mentions, [
		{raw: '@user', prefix: '@', user: 'user'},
		{raw: '@user', prefix: '@', user: 'user'},
	]);
	t.deepEqual(m('github')('@user@user').mentions, [{raw: '@user', prefix: '@', user: 'user'}]);
});

test('Exclude code blocks with backtick', t => {
	t.deepEqual(
		m('github')(
			`Fix #1, \\\`Fix #2\\\` \`Fix #3\` \`\\\`Fix #4\\\`\`
\`\`\`js
Fix #5
\`\`\``
		).actions.close,
		[
			{issue: '1', action: 'Fix', slug: undefined, prefix: '#', raw: 'Fix #1'},
			{issue: '2', action: 'Fix', slug: undefined, prefix: '#', raw: 'Fix #2'},
		]
	);
});

test('Exclude code blocks with html <code></code> tags', t => {
	t.deepEqual(
		m('github')(`Fix #1 <code>Fix #2</code> Fix #3 <code>
Fix #4</code> <CODE> Fix#5</CODE> <code><code>Fix #6</code>Fix #7</code>`).actions.close,
		[
			{issue: '1', action: 'Fix', slug: undefined, prefix: '#', raw: 'Fix #1'},
			{issue: '3', action: 'Fix', slug: undefined, prefix: '#', raw: 'Fix #3'},
		]
	);

	t.deepEqual(m('github')(`Fix #1<code><code>Fix #2</code></code>`).actions.close, [
		{issue: '1', action: 'Fix', slug: undefined, prefix: '#', raw: 'Fix #1'},
	]);

	t.deepEqual(
		m('github')(`Fix #1<code><code>
Fix #2
</code></code>`).actions.close,
		[{issue: '1', action: 'Fix', slug: undefined, prefix: '#', raw: 'Fix #1'}]
	);

	t.deepEqual(m('github')(`\`<code>\`Fix #1</code>`).actions.close, [
		{issue: '1', action: 'Fix', slug: undefined, prefix: '#', raw: 'Fix #1'},
	]);
});

test('Empty options', t => {
	t.deepEqual(m({actions: {close: []}, issuePrefixes: [], mentionsPrefixes: []})('Fix #1, @user'), {
		actions: {block: [], require: [], parentOf: [], childOf: [], duplicate: []},
		mentions: [],
		refs: [],
	});
	t.deepEqual(
		m({referenceActions: ['', '', 'fix'], issuePrefixes: ['', '#'], mentionsPrefixes: ['@', '']})('Fix #1,@user'),
		{
			refs: [],
			actions: {
				close: [{issue: '1', action: 'Fix', slug: undefined, prefix: '#', raw: 'Fix #1'}],
				block: [],
				require: [],
				parentOf: [],
				childOf: [],
				duplicate: [],
			},
			mentions: [{raw: '@user', prefix: '@', user: 'user'}],
		}
	);
});

test('Empty String', t => {
	const empty = {
		actions: {close: [], block: [], require: [], parentOf: [], childOf: [], duplicate: []},
		mentions: [],
		refs: [],
	};

	t.deepEqual(m()('   '), empty);
	t.deepEqual(m()(''), empty);
});

test('Throw TypeError for invalid options', t => {
	t.throws(
		() => m('missing-option'),
		"The supported configuration are [github, bitbucket, gitlab, waffle, default], got 'missing-option'"
	);
	t.throws(() => m([]), 'The options argument must be a String or an Object');
	t.throws(() => m(1), 'The options argument must be a String or an Object');
	t.throws(() => m({mentionsPrefixes: 1}), 'The mentionsPrefixes property must be a String or an array of Strings');
	t.throws(() => m({mentionsPrefixes: [1]}), 'The mentionsPrefixes property must be a String or an array of Strings');
	t.throws(() => m({actions: 1}), 'The options.actions property must be an Object');
	t.throws(() => m({actions: {close: 1}}), 'The actions.close property must be a String or an array of Strings');
	t.throws(() => m({actions: {close: [1]}}), 'The actions.close property must be a String or an array of Strings');
	t.throws(() => m({actions: {fix: [1]}}), 'The actions.fix property must be a String or an array of Strings');
});

test('Throw TypeError for invalid overrides', t => {
	t.throws(() => m({}, []), 'The overrides argument must be an Object');
	t.throws(() => m({}, 1), 'The overrides argument must be an Object');
	t.throws(() => m({}, ''), 'The overrides argument must be an Object');
	t.throws(() => m({}, 'string'), 'The overrides argument must be an Object');
	t.throws(() => m({}, {mentionsPrefixes: 1}), 'The mentionsPrefixes property must be a String or an array of Strings');
	t.throws(
		() => m({}, {mentionsPrefixes: [1]}),
		'The mentionsPrefixes property must be a String or an array of Strings'
	);
	t.throws(() => m({}, {actions: 1}), 'The overrides.actions property must be an Object');
	t.throws(() => m({}, {actions: {close: 1}}), 'The actions.close property must be a String or an array of Strings');
	t.throws(() => m({}, {actions: {close: [1]}}), 'The actions.close property must be a String or an array of Strings');
	t.throws(() => m({}, {actions: {fix: [1]}}), 'The actions.fix property must be a String or an array of Strings');
});

test('Throw TypeError for invalid input', t => {
	t.throws(() => m()(), 'The issue text must be a String');
	t.throws(() => m()(1), 'The issue text must be a String');
	t.throws(() => m()({}), 'The issue text must be a String');
	t.throws(() => m()([]), 'The issue text must be a String');
});
