import React, { useEffect, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import * as recipeActions from './../store/actions/recipeActions';
import { connect } from 'react-redux';

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16,
};

const baseStyle = {
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '20px',
	borderWidth: 2,
	borderRadius: 2,
	borderColor: '#eeeeee',
	borderStyle: 'dashed',
	backgroundColor: '#fafafa',
	color: '#bdbdbd',
	outline: 'none',
	transition: 'border .24s ease-in-out',
};

const activeStyle = {
	borderColor: '#2196f3',
};

const acceptStyle = {
	borderColor: '#00e676',
};

const rejectStyle = {
	borderColor: '#ff1744',
};

const thumb = {
	display: 'inline-flex',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	marginBottom: 8,
	marginRight: 8,
	width: 100,
	height: 100,
	padding: 4,
	boxSizing: 'border-box',
};

const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden',
};

const img = {
	display: 'block',
	width: 'auto',
	height: '100%',
};

function DropZone(props) {
	const [file, setFile] = useState();
	const {
		// acceptedFiles,
		// fileRejections,
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		maxFiles: 1,
		accept: 'image/*',
		onDrop: (acceptedFiles) => {
			const image = Object.assign(acceptedFiles[0], {
				preview: URL.createObjectURL(acceptedFiles[0]),
			});
			props.setRecipeImage(image);
			setFile(image);
		},
	});

	// const acceptedFileItems = acceptedFiles.map((file) => (
	// 	<li key={file.path}>
	// 		{file.path} - {file.size} bytes
	// 	</li>
	// ));

	// const fileRejectionItems = fileRejections.map(({ file, errors }) => {
	// 	return (
	// 		<li key={file.path}>
	// 			{file.path} - {file.size} bytes
	// 			<ul>
	// 				{errors.map((e) => (
	// 					<li key={e.code}>{e.message}</li>
	// 				))}
	// 			</ul>
	// 		</li>
	// 	);
	// });

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragActive, isDragReject, isDragAccept]
	);

	const thumbContent = file ? (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<img alt='preview' src={file.preview} style={img} />
			</div>
		</div>
	) : null;

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			if (file) {
				URL.revokeObjectURL(file.preview);
			}
		},
		[file]
	);

	return (
		<section className='container'>
			<div {...getRootProps({ style })}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
				<em>(1 files are the maximum number of files you can drop here)</em>
			</div>
			<aside style={thumbsContainer}>{thumbContent}</aside>
		</section>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		setRecipeImage: (image) =>
			dispatch({
				type: recipeActions.SET_IMAGE_TO_UPLOAD,
				image,
			}),
	};
};

export default connect(null, mapDispatchToProps)(DropZone);
